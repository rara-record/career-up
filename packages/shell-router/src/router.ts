import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { type CreateRouterProps } from "./types";

type Router =
  | ReturnType<typeof createBrowserRouter>
  | ReturnType<typeof createMemoryRouter>;

/**
 * @description
 * - 라우터를 만드는 함수로, 생성된 라우터로 <RouterProvider> 로 주입될 수 있습니다.
 * - type 매개변수를 통해 'browser' 라우터와 'memory' 라우터 중 선택할 수 있게 해줍니다.
 * - 따라서 서버사이드 렌더링, 테스트 환경에서 유연하게 라우터를 전환할 수 있는 가능성을 제공합니다.
 * - basePath 매개변수를 사용하여 초기 경로를 설정할 수 있습니다.
 *
 * @example
 * 개발 환경: 로컬 개발 중에는 createBrowserRouter를 사용합니다.
 * 테스트 환경: 테스트 시에는 createMemoryRouter를 사용합니다.
 */

export function createRouter({
  type,
  routes,
  basePath,
}: CreateRouterProps): Router {
  switch (type) {
    case "browser":
      return createBrowserRouter(routes);
    case "memory":
      return createMemoryRouter(routes, { initialEntries: [basePath || "/"] });
  }
}
