import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ANONYMOUS, TossPaymentsWidgets, loadTossPayments } from '@tosspayments/tosspayments-sdk';

const useTossPayment = () => {
  const { status, data: session } = useSession();
  const [widget, setWidget] = useState<TossPaymentsWidgets | null>(null);
  const [isReady, setIsReady] = useState(false);

  const renderWidget = useCallback(() => {
    if (!widget) return;
  }, [widget]);

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    async function initToss() {
      if (!clientKey) {
        return;
      }
      const tossPayment = await loadTossPayments(clientKey);

      const widgets = tossPayment.widgets({
        customerKey: status === 'authenticated' ? session.user.id : ANONYMOUS,
      });

      setWidget(widgets);
    }

    initToss();
  }, [session, status]);

  return { widget, isReady };
};

export default useTossPayment;
