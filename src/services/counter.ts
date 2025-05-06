import type { ICounterService } from "./interfaces/counter";

class CounterService implements ICounterService {
  constructor(private kv: Map<string, number>) {}

  Increment() {
    const count = this.GetCount() || 0;
    this.kv.set("counter", count + 1);
  }

  GetCount() {
    return this.kv.get("counter") || 0;
  }
}

export { CounterService };
