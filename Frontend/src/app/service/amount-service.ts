import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AmountService{
  amounts = new Map<string,number>

  add(s: string){
    if (this.amounts.has(s))
    {
      let x = this.amounts.get(s)
      this.amounts.delete(s)
      if (x) this.amounts.set(s,x+1)
    }
  }
  subtract(s: string){
    if (this.amounts.get(s)==1) return
    if (this.amounts.has(s))
    {
      let x = this.amounts.get(s)
      this.amounts.delete(s)
      if (x) this.amounts.set(s,x-1)
    }
  }

  displayAmount(s: string): number
  {
    let x = this.amounts.get(s)
    if (x) return x
    this.amounts.set(s,1)
    return 1

  }

  ResetAmount(name: string)
  {
    this.amounts.delete(name)
    this.amounts.set(name,1)
  }
}
