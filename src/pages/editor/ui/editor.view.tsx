import { Editor } from "@/widgets/editor/ui/base/editor.component";

const EditorView: React.FC = () => {
  return (
    <div className="w-full min-h-screen max-w-[1000px] mx-auto px-2 py-10">
      <Editor />
    </div>
  );
};

export default EditorView;
