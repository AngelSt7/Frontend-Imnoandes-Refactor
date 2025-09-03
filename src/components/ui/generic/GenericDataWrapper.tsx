import { useQuery } from '@tanstack/react-query';
import GenericModal from './GenericModal';
import { User as UserInfo } from '@/src/types';

type GenericDataWrapperProps<T> = {
  id: string;
  user?: UserInfo;
  closeModal: () => void;
  serviceFunction: (id: string) => Promise<T>;
  queryKey: string;
};

export default function GenericDataWrapper<T>({ id, user, serviceFunction, queryKey, closeModal}: GenericDataWrapperProps<T>) {
  const { data } = useQuery({
    queryKey: [queryKey, id],
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
