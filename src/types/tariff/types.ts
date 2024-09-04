export type TariffDto = {
    _id: string;
    name: string;
    periods: TariffPeriod[];
};

export type TariffPeriod = {
    text: string;
    cost: number;
    days: number;
};

export type BuyTariffDto = {
    tariffId: string;
    days: number;
};
