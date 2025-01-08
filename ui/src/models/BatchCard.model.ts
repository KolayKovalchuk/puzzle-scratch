export enum BatchCardType {
    ICE_BOX = 'ICE_BOX',
    CANDY_MAZE = 'CANDY_MAZE',
    SANTA_SAC = 'SANTA_SAC'
}


export class BatchCard {
    batchId: string;
    batchName: string;
    cardType: BatchCardType;
    cardsCount: number;
    scratchedCards: number;
    totalCardsInBatch: number;
    winnersCount: number;
    wonPrizeSum: number;
    totalPotentialPrizes: number;
    availablePrizes: number;
    pricePerCard: number;
    sizeX: number;
    sizeY: number;
    maxPrize: number;

    constructor(data: BatchCard) {
        this.batchId = data.batchId;
        this.batchName = data.batchName;
        this.cardType = data.cardType;
        this.cardsCount = data.cardsCount;
        this.scratchedCards = data.scratchedCards;
        this.totalCardsInBatch = data.totalCardsInBatch;
        this.winnersCount = data.winnersCount;
        this.wonPrizeSum = data.wonPrizeSum;
        this.totalPotentialPrizes = data.totalPotentialPrizes;
        this.availablePrizes = data.availablePrizes;
        this.pricePerCard = data.pricePerCard;
        this.sizeX = data.sizeX;
        this.sizeY = data.sizeY;
        this.maxPrize = data.maxPrize;
    }
}