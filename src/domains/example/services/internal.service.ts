import { ExampleDomainInternalContainer } from "../example.container.js";

export class InternalService {
  constructor(private readonly deps: ExampleDomainInternalContainer) {}

  internalProcess() {
    this.deps.logger.info({
      internalThing: "osiem",
      msg: "Called inside internal service",
    });
  }
}
