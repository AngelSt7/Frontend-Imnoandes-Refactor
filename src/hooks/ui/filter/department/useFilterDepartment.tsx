import { useMemo } from 'react';
import { DEPARTMENT_DROPDOWN } from '../../../../utils/resolves/bases/select';


interface UseFilterDepartmentProps {
    onGetParam: (key: string) => string | null
}

export const useFilterDepartment = ({
    onGetParam
}: UseFilterDepartmentProps) => {
    const resolveLabelDepartment = (paramKey: string) => {
        const value = onGetParam(paramKey);
        switch (value) {
            case "Lima":
                return new Set(["Lima"]);
            case "Cusco":
                return new Set(["Cusco"]);
            case "Ica":
                return new Set(["Ica"]);
            case "Arequipa":
                return new Set(["Arequipa"]);
            case "Piura":
                return new Set(["Piura"]);
            default:
                return new Set(["Todos"]);
        }
    };

    const getDepartmentButtonText = useMemo(() => {
        const value = onGetParam("departmentId");
        const selectedDepartment = DEPARTMENT_DROPDOWN.find(dept => dept.key === value);
        return selectedDepartment?.label || "Departamento";
    }, [onGetParam]);

    return {
        resolveLabelDepartment,
        getDepartmentButtonText
    }
}
