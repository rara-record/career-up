import { createRoot } from "react-dom/client";
import { RouteObject, RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { type RouterType } from "./types";

/***
 * @description
 * 마이크로앱(remote)이 쉘(host)에 주입될 수 있도록 도와주는 함수입니다.
 *
 * 동적 라우터 생성
 * - createRouter를 사용하여 주어진 라우트 구성에 기반한 라우터를 동적으로 생성합니다.
 *
 * root 인스턴스 생성 및 렌더링
 * - RouterProvider를 사용하여 생성된 라우터와 함께 앱을 렌더링합니다.
 *
 * unmount
 * - 반환된 함수는 queueMicrotask를 사용하여 비동기적으로 루트 컴포넌트를 안전하게 언마운트합니다.
 */

function injectFactory({ routes }: { routes: RouteObject[] }) {
  return ({
    rootElement,
    basePath,
    routerType,
  }: {
    rootElement: HTMLElement;
    basePath?: string;
    routerType: RouterType;
  }) => {
    const router = createRouter({
      type: routerType,
      routes,
      basePath,
    });

    const root = createRoot(rootElement);
    root.render(<RouterProvider router={router} />);

    /**
     * - remove inject
     *-  브라우저에 이벤트 제어가 넘어가기 전에 root에 unmount를 통해서 적절한 시점에 unmount가 되도록 해줍니다.
     * - 마이크로앱이 쉘에서 제거될 때 메모리 누수를 방지하며, cleanup을 보장합니다.
     */
    return () => queueMicrotask(() => root.unmount());
  };
}

export { injectFactory };
