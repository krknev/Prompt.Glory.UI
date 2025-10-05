
export interface ListMarketItem{

     marketplaceItemId :string,
     imagUrl :string,
     price : number,
     ownerId :string,
     ownerUsername :string
}

export interface DetailMarketItem extends ListMarketItem{

 description: string,

  createdOn:string,
  modifiedOn:string, 
}