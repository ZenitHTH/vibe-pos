"use client";

import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import { FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useImageManagement } from "./hooks/useImageManagement";
import ImageGrid from "@/components/manage/ImageGrid";
import LinkImageModal from "@/components/manage/LinkImageModal";

export default function ImageManagePage() {
  const {
    images,
    links,
    isLinkModalOpen,
    setIsLinkModalOpen,
    selectedImage,
    productSearch,
    setProductSearch,
    handleDelete,
    handleUpload,
    onFileChange,
    openLinkModal,
    toggleLink,
    getProductUsage,
    filteredProductsToLink,
  } = useImageManagement();

  return (
    <ManagementPageLayout
      title="Image Management"
      subtitle="Upload and manage images, check product usage."
      scaleKey="manage_table_scale"
      headerActions={
        <div className="flex gap-2">
          <input
            type="file"
            id="image-upload-input"
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
          <Button onClick={handleUpload} className="gap-2">
            <FaUpload /> Upload Image
          </Button>
        </div>
      }
      scrollable={true}
    >
      <ImageGrid
        images={images}
        getProductUsage={getProductUsage}
        openLinkModal={openLinkModal}
        handleDelete={handleDelete}
      />

      <LinkImageModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        selectedImage={selectedImage}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        filteredProductsToLink={filteredProductsToLink}
        links={links}
        toggleLink={toggleLink}
      />
    </ManagementPageLayout>
  );
}
