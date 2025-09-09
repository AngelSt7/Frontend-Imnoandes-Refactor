import { useQuery } from '@tanstack/react-query';
import GenericModal from './GenericModal';
import { User as UserInfo } from '@/src/types';

type GenericDataWrapperProps = {
  id: string;
  user?: UserInfo;
  closeModal: () => void;
  serviceFunction: (id: string) => Promise<any>;
  queryKey: string[];
};

export default function GenericDataWrapper({ id, user, serviceFunction, queryKey, closeModal}: GenericDataWrapperProps) {
  console.log([...queryKey])
  const { data } = useQuery({
    queryKey: [...queryKey],
    queryFn: () => serviceFunction(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if(data) return (
    <GenericModal
      id={id}
      defaultValues={data}
      closeModal={closeModal}
      {...(user && { user })}
    />
  );
}
