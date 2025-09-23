import { JSX } from "react"
import CreateProperty from '../../../../features/property/admin/subfeatures/CreateProperty/CreateProperty';
import { EditProperty } from "@/src/components";
import DetailsProperty from "@/src/components/dashboard/properties/actions/DetailsProperty";
import ImageManagerOrquest from "@/src/components/dashboard/properties/gallery/ImageManagerOrquest";

interface FormsByAction {
  [action: string]: {
    [entity: string]: (props: any) => JSX.Element;
  };
}

export const formsByAction: FormsByAction = {
  create: {
    property: () => <CreateProperty />,
  },
  edit: {
    property: (props) => (
      <EditProperty user={props.user} defaultValues={props.defaultValues} />
    ),
  },
  details: {
    property: (props) => <DetailsProperty data={props.defaultValues} />,
  },
  "custom-images": {
    property: (props) => (
      <ImageManagerOrquest defaultValues={props.defaultValues} />
    ),
  },
};
