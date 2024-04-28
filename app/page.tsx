import dynamic from "next/dynamic";
const TodoSection = dynamic(() => import("./components/module/TodoSection"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className="p-6 lg:p-12">
      <TodoSection />
    </div>
  );
}
