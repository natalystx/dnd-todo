"use client";

import React, { useEffect } from "react";
import Input from "../../base/Input";
import Badge from "../../base/Badge";
import { cn } from "@/utils/cn";
import { useTodos } from "@/app/store/useTodos";
import Button from "../../base/Button";

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
  const { undoRemoveTodo, deleteSubject } = useTodos();
  const [showUndo, setShowUndo] = React.useState(false);
  const [progress, setProgress] = React.useState(15000);

  useEffect(() => {
    let interval: any;
    let timeout: any;
    deleteSubject.subscribe((val) => {
      setShowUndo(true);
      setProgress(15000);
      timeout = setTimeout(() => {
        setShowUndo(false);
      }, 15000);

      interval = setInterval(() => {
        setProgress((prev) => (prev - 60 > 0 ? prev - 60 : 0));
      }, 60);
    });

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSubject]);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-end">
        <Input
          label="Search by todo's title"
          placeholder="Search"
          className="max-w-[500px] lg:w-[500px]"
          onChange={(e: any) => {
            onSearch(e.target.value);
          }}
        />
        {showUndo && (
          <Button
            className="w-fit !btn-md"
            onClick={() => {
              undoRemoveTodo();
              setShowUndo(false);
            }}
          >
            Undo
          </Button>
        )}
      </div>
      {showUndo && (
        <progress
          className="progress progress-error w-full max-w-[500px] transition-colors"
          value={((progress / 15000) * 100).toString()}
          max="100"
        ></progress>
      )}
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
