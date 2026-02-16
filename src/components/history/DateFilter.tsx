import { FaSearch } from "react-icons/fa";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  loading: boolean;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}

export default function DateFilter({
  startDate,
  endDate,
  loading,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}: DateFilterProps) {
  return (
    <div className="bg-card text-card-foreground border-border mb-8 flex flex-wrap items-end gap-4 rounded-2xl border p-6 shadow-sm">
      <div>
        <label className="text-muted-foreground mb-2 block text-sm font-medium">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl border px-4 py-2 outline-none focus:ring-2"
        />
      </div>
      <div>
        <label className="text-muted-foreground mb-2 block text-sm font-medium">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl border px-4 py-2 outline-none focus:ring-2"
        />
      </div>
      <button
        onClick={onFilter}
        disabled={loading}
        className="bg-primary text-primary-foreground mb-px flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold transition-colors hover:bg-blue-600"
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            <FaSearch /> Filter
          </>
        )}
      </button>
    </div>
  );
}
