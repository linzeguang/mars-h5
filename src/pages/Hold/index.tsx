import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useModel } from 'foca';
import { useToggle } from '@mantine/hooks';

import { api } from '@/apis';
import { HELD_TYPE } from '@/constants';
import { appModel } from '@/models/appModel';
import { IncomeData, IncomeNum, UsersCombo } from '@/types/hold';

import AmountCard from './components/AmountCard';
import Helds from './components/Helds';

const Hold: React.FC = () => {
  const { token } = useModel(appModel);
  const [type, toggleType] = useToggle<HELD_TYPE>([
    HELD_TYPE.ALL,
    HELD_TYPE.PROGRESSING,
    HELD_TYPE.WAITPAY,
    HELD_TYPE.EXPIRED,
  ]);
  const [commboList, setCommboList] = useState<UsersCombo[]>([]);
  const [incomeNum, setIncomeNum] = useState<IncomeNum>();
  const [incomeData, setIncomeData] = useState<IncomeData>();

  const fetchCombos = useCallback(async () => {
    if (!token) return;

    try {
      const { state, msg, users_combo, income_num, income_data } = await api.userscombolist({
        token,
        type,
      });
      if (state !== 200) throw msg;
      setCommboList(users_combo);
      setIncomeNum(income_num);
      setIncomeData(income_data);
    } catch (error) {
      toast.error(error as string);
    }
  }, [token, type]);

  useEffect(() => {
    fetchCombos();
  }, [fetchCombos]);

  return (
    <>
      <AmountCard incomeData={incomeData} />
      <Helds type={type} toggleType={toggleType} commboList={commboList} incomeNum={incomeNum} />
    </>
  );
};

export default Hold;
