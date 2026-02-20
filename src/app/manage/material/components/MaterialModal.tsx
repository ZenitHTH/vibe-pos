import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Material } from "./MaterialTable";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

interface MaterialFormData {
  name: string;
  unit_of_measurement: string;
  cost_per_unit_thb: number;
}

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MaterialFormData) => Promise<void>;
  initialData?: Material;
  isSubmitting?: boolean;
}

export default function MaterialModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: MaterialModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaterialFormData>();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          unit_of_measurement: initialData.unit_of_measurement,
          cost_per_unit_thb: initialData.cost_per_unit / 100, // Convert satang to THB for UI
        });
      } else {
        reset({
          name: "",
          unit_of_measurement: "Pieces",
          cost_per_unit_thb: 0,
        });
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Material" : "Add Material"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Material Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Material name is required",
            minLength: { value: 1, message: "Name must not be empty" },
            maxLength: { value: 100, message: "Name is too long" },
          })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Cost (฿)"
            type="number"
            step="0.01"
            min="0"
            error={errors.cost_per_unit_thb?.message}
            {...register("cost_per_unit_thb", {
              required: "Cost is required",
              min: { value: 0, message: "Cost cannot be negative" },
              max: { value: 10000000, message: "Cost is too high" },
            })}
          />

          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">
              Unit of Measurement
            </label>
            <select
              className="bg-background border-input text-foreground focus:border-primary focus:ring-primary w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              {...register("unit_of_measurement", { required: true })}
            >
              <option value="Pieces">Pieces</option>
              <option value="Liters">Liters</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Grams">Grams</option>
              <option value="Milliliters">Milliliters</option>
              <option value="Box">Box</option>
              <option value="Pack">Pack</option>
            </select>
          </div>
        </div>

        <div className="border-border mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted rounded-xl px-4 py-2 font-medium transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-xl px-6 py-2 font-medium shadow-sm transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
            ) : null}
            {isSubmitting ? "Saving..." : "Save Material"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
