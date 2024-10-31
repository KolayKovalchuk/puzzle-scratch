export class BatchCard {
    batchId: string;
    batchName: string;
    cardsCount: number;
    scratchedCards: number;
    totalCardsInBatch: number;
    winnersCount: number;
    wonPrizeSum: number;
    totalPotentialPrizes: number;
    availablePrizes: number;
    pricePerCard: number;

    constructor(data: BatchCard) {
        this.batchId = data.batchId;
        this.batchName = data.batchName;
        this.cardsCount = data.cardsCount;
        this.scratchedCards = data.scratchedCards;
        this.totalCardsInBatch = data.totalCardsInBatch;
        this.winnersCount = data.winnersCount;
        this.wonPrizeSum = data.wonPrizeSum;
        this.totalPotentialPrizes = data.totalPotentialPrizes;
        this.availablePrizes = data.availablePrizes;
        this.pricePerCard = data.pricePerCard;
    }
}