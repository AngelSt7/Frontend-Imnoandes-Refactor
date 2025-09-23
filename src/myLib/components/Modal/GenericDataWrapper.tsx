import { useQuery } from '@tanstack/react-query';
import { GenericModal } from './GenericModal';

type GenericDataWrapperProps<T> = {
  id: string;
  user?: T;
  closeModal: () => void;
  serviceFunction: (id: string) => Promise<any>;
  queryKey: string[];
};

export function GenericDataWrapper<T>({ id, user, serviceFunction, queryKey, closeModal }: GenericDataWrapperProps<T>) {
  const { data } = useQuery({
    queryKey: [...queryKey],
    queryFn: () => serviceFunction(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (data) return (
    <GenericModal
      id={id}
      defaultValues={data}
      closeModal={closeModal}
      {...(user && { user })}
    />
  );
}
