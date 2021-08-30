import { Trade } from "./generated/graphql";

export interface TradeWithPL extends Trade {
    profitLoss: number
}