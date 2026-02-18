import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";

interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProductFilter = memo(function ProductFilter({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <FaSearch className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-card text-card-foreground border-border focus:ring-primary/50 placeholder:text-muted-foreground/70 w-full rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-xl px-5 py-2.5 font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg"
                : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
});

export default ProductFilter;
