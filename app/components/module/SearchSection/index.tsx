"use client";

import React from "react";
import Input from "../../base/Input";
import Badge from "../../base/Badge";
import { cn } from "@/utils/cn";

type SearchSectionProps = {
  tagList: string[];
  activeTag: string[];
  onSelectTag: (tag: string) => void;
  onSearch: (val: string) => void;
};

const SearchSection = ({
  tagList,
  activeTag,
  onSelectTag,
  onSearch,
}: SearchSectionProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Input
        label="Search by todo's title"
        placeholder="Search"
        className="max-w-[500px]"
        onChange={(e: any) => {
          onSearch(e.target.value);
        }}
      />
      <div className="flex flex-wrap gap-1">
        {tagList.map((tag) => (
          <Badge
            onClick={() => onSelectTag(tag)}
            key={`search-${tag}`}
            className={cn(
              "cursor-pointer",
              activeTag.includes(tag) && "bg-blue-300"
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SearchSection;
