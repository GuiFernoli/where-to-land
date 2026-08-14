export interface City {
    id: string;
    name: string;
    province: string;
    costs: {
        rent: number;
        food: number;
        transport: number;
        utilities: number;
    };
    costIndex: number;
}

export interface Role {
    id: string;
    title: string;
    salaryByCity: Record<string, number>;
}
