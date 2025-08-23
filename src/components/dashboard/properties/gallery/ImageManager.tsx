"use client";
import { useState, useRef, forwardRef, RefObject } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { openDefaultEditor } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

interface ImageManagerProps {
  drawerRef?: RefObject<HTMLDivElement | null>
}

export default function ImageManager({ drawerRef }: ImageManagerProps) {
  const [files, setFiles] = useState<any[]>([]);

  console.log( "drawerRef?.current" ,drawerRef?.current);

  return (
    <div className="w-[60%] mx-auto" ref={drawerRef}>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
        name="filepond"
        labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action">Explorar</span>'
        
        imagePreviewHeight={170}
        imageCropAspectRatio="1:1"
        imageResizeTargetWidth={200}
        imageResizeTargetHeight={200}
        
        stylePanelLayout="compact circle"
        styleLoadIndicatorPosition="center bottom"
        styleProgressIndicatorPosition="right bottom"
        styleButtonRemoveItemPosition="left bottom"
        styleButtonProcessItemPosition="right bottom"

        imageEditEditor={{
          open: (file: File, instructions: any, options: any) => {
            return openDefaultEditor({
              src: file,
              ...instructions,
              utils: ['crop', 'filter', 'finetune', 'redact', 'decorate'],
              cropAspectRatio: 1,
              appendTo: drawerRef?.current,
              modalClass: 'pintura-editor-modal',
              preventScroll: true,

              modal: false,
              enableCanvasRenderingGroup: false,
              enableKeyInput: false,

              size: {
                width: '80%',
                height: '70vh'
              },

              position: 'relative',
            });
          }
        }}
        imageEditInstantEdit={false}
      />
    </div>
  );
}