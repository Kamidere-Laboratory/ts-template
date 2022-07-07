import { createMainContainer } from "./container.js";
import { exampleDomainContainer } from "./domains/example/example.container.js";

// I export it because I don't have anything where I can pass it like context of fastyfi
export const mainContainer = await createMainContainer();

// lets assume this is injected inside some middleware or something
mainContainer.cradle.logger.debug("test");
const exampleDomain = await exampleDomainContainer(mainContainer);

const exampleService = exampleDomain.resolve("exampleService");
exampleService.getExampleById("test");
exampleService.callInternalService();
