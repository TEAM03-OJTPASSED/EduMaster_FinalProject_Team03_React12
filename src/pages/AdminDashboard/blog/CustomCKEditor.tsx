import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

// Extend ClassicEditor to add the Base64UploadAdapter
class ClassicEditor extends ClassicEditorBase {}
ClassicEditor.builtinPlugins = [...ClassicEditor.builtinPlugins, Base64UploadAdapter];

export default CKEditor;
export { ClassicEditor };
