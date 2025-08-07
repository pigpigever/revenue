import React from 'react';
import {Button, ButtonGroup, ButtonGroupOwnProps} from '@mui/material';

export type RevenueMetricKey = string;

export type TabItem = {
  key: RevenueMetricKey;
  label: string;
};

type TabSwitcherProps = {
  size?: ButtonGroupOwnProps['size'];
  selectedTab: RevenueMetricKey;
  onChange: (key: RevenueMetricKey) => void;
  tabs: TabItem[];
};

const TabSwitcher: React.FC<TabSwitcherProps> = ({ selectedTab, onChange, tabs, size = 'small' }) => {
  return (
    <ButtonGroup
      size={size}
    >
      {tabs.map(({ key, label }) => {
        const isSelected = selectedTab === key;
        const color = isSelected ? '#fff' : 'black';
        const bgColor = isSelected ? 'primary.main' : '#dfdfdf';
        const borderColor = isSelected ? '#dfdfdf' : '#dfdfdf';
        return (
          <Button
            key={key}
            onClick={() => onChange(key)}
            sx={{
              backgroundColor: bgColor,
              '&:hover': {
                backgroundColor: bgColor,
              },
              borderColor: borderColor,
              color,
            }}
            value={key}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default TabSwitcher;
