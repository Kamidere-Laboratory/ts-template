import { asClass } from "awilix";

import { Container, createDomainContainer } from "../../container.js";

import { ExampleService } from "./services/example.service.js";
import { InternalService } from "./services/internal.service.js";

export type ExampleDomainInternalContainer = {
  exampleService: ExampleService;
  internalService: InternalService;
} & Container;

export type ExampleDomainExternalContainer = Pick<ExampleDomainInternalContainer, "exampleService">;

// lets assume this is injected inside some middleware or something
export const exampleDomainContainer = async (mainContainer: any) =>
  await createDomainContainer<ExampleDomainInternalContainer, ExampleDomainExternalContainer>(
    mainContainer,
    "Example",
    [
      (dc) => dc.register("internalService", asClass(InternalService)),
      (dc) => dc.register("exampleService", asClass(ExampleService)),
    ],
  );
