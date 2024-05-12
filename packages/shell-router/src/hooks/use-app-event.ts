import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @description
 * - 쉘 또는 다른 외부 시스템과의 라우팅 이벤트 통신을 관리하는 훅입니다.
 * - 앱의 라우팅 변경을 외부에 알리기 위해 사용되며, 특히 쉘에 앱의 상태를 통보할 때 활용됩니다.
 * - 특히 다수의 마이크로앱의 라우팅 상태를 동기화하기 위해 사용됩니다.
 *
 * 첫 번째 useEffect (이벤트 수신):
 * - 쉘 또는 다른 외부 시스템에서 발송된 이벤트를 수신합니다.
 * - 수신된 이벤트의 `detail`에서 전달된 경로 정보를 사용하여 앱의 라우팅을 업데이트합니다.
 * - 경로 정보가 현재 위치(location.pathname)와 다를 경우, navigate 함수를 사용하여 해당 경로로 이동합니다.
 *
 * 두 번째 useEffect (이벤트 발송):
 * - 앱 내 라우팅의 변경을 감지하고 이를 외부 시스템에 알리기 위해 이벤트를 발송합니다.
 * - `[${type}] navigated` 이벤트는 앱의 현재 경로를 `detail`로 전달하여 쉘에 라우팅 변경을 통보합니다.
 */

export default function useAppEvent(type: string) {
  const navigate = useNavigate();
  const location = useLocation();

  // 쉘 또는 다른 외부 시스템에서 발송된 라우팅 변경 이벤트를 수신
  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;

      if (location.pathname === pathname) {
        return;
      }

      navigate(pathname);
    }

    window.addEventListener(`[app-shell] navigated`, shellNavigationHandler);

    return () => {
      window.removeEventListener(
        `[app-shell] navigated`,
        shellNavigationHandler
      );
    };
  }, [location, navigate]);

  // 앱 내 라우팅 변경을 외부에 통보하기 위해 이벤트 발송
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(`[${type}] navigated`, { detail: location.pathname })
    );
  }, [location, type]);
}
