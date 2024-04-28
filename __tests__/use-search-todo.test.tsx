import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { useSearch } from "@/app/components/module/TodoSection/useSearch";
import { Status, Todo } from "@/app/store/useTodos";

const mockTodos: Todo[] = [
  { id: "1", title: "todo 1", status: Status.NEW, tags: ["tag1", "tag2"] },
  { id: "2", title: "todo 2", status: Status.COMPLETED, tags: ["tag2"] },
  { id: "3", title: "todo 3", status: Status.NEW, tags: [] },
];

let result: any;
let rerender: any;

beforeEach(() => {
  const hook = renderHook(() => useSearch(mockTodos));
  result = hook.result;
  rerender = hook.rerender;
  result.current.onSearch("");
  result.current.setSelectedTag([]);
});

describe("useSearch", () => {
  test("should return an array of todo's ids", () => {
    expect(Array.isArray(result.current.formattedFilter)).toBe(true);
    expect(typeof result.current.formattedFilter[0]).toBe("string");
  });

  test("should return all todo's ids when search is empty", () => {
    expect(result.current.formattedFilter.length).toBe(3);
  });

  test("should return todo's ids that match search", async () => {
    result.current.onSearch("todo 1");

    await waitFor(
      () => {
        rerender();
        expect(result.current.formattedFilter.length).toBe(1);
        expect(result.current.formattedFilter[0]).toBe("1");
      },
      {
        timeout: 300,
      }
    );
    rerender();
    expect(result.current.formattedFilter.length).toBe(1);
    expect(result.current.formattedFilter[0]).toBe("1");
  });

  test("should not return todo's ids haven't match the search", async () => {
    result.current.onSearch("tada!!!");

    await waitFor(
      () => {
        rerender();
        expect(result.current.search).toEqual("tada!!!");
        expect(result.current.formattedFilter.length).toBe(0);
      },
      {
        timeout: 300,
      }
    );
  });

  test("should return  todo's ids when tags is matched", async () => {
    result.current.setSelectedTag(["tag1"]);
    await waitFor(
      () => {
        rerender();

        expect(result.current.formattedFilter.length).toBe(1);
      },
      {
        timeout: 300,
      }
    );
  });

  test("should not return todo's ids when tags is not matched", () => {
    result.current.setSelectedTag(["yyyyy"]);
    rerender();
    expect(result.current.formattedFilter.length).toBe(0);
  });

  test("should return all todo's ids when tags and search both match", async () => {
    result.current.setSelectedTag(["tag2"]);
    result.current.onSearch("todo 2");

    await waitFor(
      () => {
        rerender();
        expect(result.current.search).toEqual("todo 2");
        expect(result.current.formattedFilter.length).toBe(1);
      },
      {
        timeout: 300,
      }
    );
  });

  test("should not return todo's ids when tags is match but search doesn't match", async () => {
    result.current.setSelectedTag(["tag2"]);
    result.current.onSearch("tada!!!");

    await waitFor(
      () => {
        rerender();
        expect(result.current.formattedFilter.length).toBe(0);
      },
      {
        timeout: 300,
      }
    );
  });
});
