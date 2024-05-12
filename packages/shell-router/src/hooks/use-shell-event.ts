import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @description
 * - 쉘과 마이크로앱 간의 라우팅 이벤트를 관리하는 훅입니다.
 * - 쉘로부터 발생하는 이벤트에 대해 반응하고, 쉘의 라우팅 상태에 따라 마이크로앱의 내부 라우팅을 [동기화]할 때 사용됩니다.
 * - 주로 마이크로앱에서 사용되어, 쉘의 라우팅 변경을 감지하고 그에 따라 반응합니다.
 *
 * 첫번째 useEffect (쉘로부터 이벤트 수신):
 *  -쉘에서 `[${type}] navigated` 타입의 이벤트를 감지합니다.
 * - 이벤트가 발생하면, 리스너는 이벤트의 detail에서 새 경로를 추출하고, 필요에 따라 basename을 붙여 새로운 전체 경로를 구성합니다.
 * - 새로운 경로가 현재 위치(location.pathname)와 다르면, navigate 함수를 사용하여 해당 경로로 이동합니다.
 *
 * 두번째 useEffect (쉘에 이벤트 전송):
 * - 마이크로앱의 경로가 변경될 때 쉘에 알리기 위해 "[app-shell] navigated" 타입의 커스텀 이벤트를 발송합니다.
 * - 이 이벤트의 detail은 현재 경로에서 basename을 제거한 값입니다, 즉 마이크로앱의 로컬 경로를 나타냅니다.
 */

export default function useShellEvent(type: string, basename: string) {
  const location = useLocation();
  const navigate = useNavigate();

  // 쉘로부터 발생하는 라우팅 이벤트를 수신하는 함수
  useEffect(() => {
    const appNavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname =
        pathname === "/" ? basename : `${basename}${pathname}`;

      if (newPathname === location.pathname) {
        return;
      }

      navigate(newPathname);
    };
    window.addEventListener(`[${type}] navigated`, appNavigationEventHandler);

    return () => {
      window.removeEventListener(
        `[${type}] navigated`,
        appNavigationEventHandler
      );
    };
  }, [basename, location, navigate, type]);

  // 쉘의 라우팅이 변경될 때 이벤트를 발송하는 함수
  useEffect(() => {
    if (location.pathname.startsWith(basename)) {
      window.dispatchEvent(
        new CustomEvent("[app-shell] navigated", {
          detail: location.pathname.replace(basename, ""),
        })
      );
    }
  }, [basename, location]);
}
