import { ExampleDomainInternalContainer } from "../example.container.js";

export class ExampleService {
  constructor(private readonly deps: ExampleDomainInternalContainer) {}

  getExampleById(id: string) {
    this.deps.logger.debug({
      example: {
        id,
        text: "osiem",
      },
    });
  }

  callInternalService() {
    this.deps.internalService.internalProcess();
  }
}
