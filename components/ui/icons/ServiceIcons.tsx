import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Water Application: plain outlined water drop. */
export function WaterDropIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c2.8 3.6 5 6.7 5 9.6a5 5 0 0 1-10 0c0-2.9 2.2-6 5-9.6Z" />
    </svg>
  );
}

/** Termination: water drop struck through with a diagonal line. */
export function WaterDropSlashIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c2.8 3.6 5 6.7 5 9.6a5 5 0 0 1-10 0c0-2.9 2.2-6 5-9.6Z" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

/** Reconnection: water drop with a small circle notch near the top. */
export function WaterDropDotIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c2.8 3.6 5 6.7 5 9.6a5 5 0 0 1-10 0c0-2.9 2.2-6 5-9.6Z" />
      <circle cx="15.5" cy="6.5" r="1.6" />
    </svg>
  );
}

/** Water meter testing: gauge dial with a drop-shaped base. */
export function WaterMeterIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="10" r="5.5" />
      <path d="M12 10l2.2-2.2" />
      <path d="M9.2 15.5c-.9 1.1-1.4 2-1.4 2.8a4.2 4.2 0 0 0 8.4 0c0-.8-.5-1.7-1.4-2.8" />
    </svg>
  );
}

/** Change of account name: two overlapping people. */
export function TwoPeopleIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="8" r="2.6" />
      <circle cx="16" cy="9" r="2.1" />
      <path d="M4.2 18c.4-2.8 2.4-4.6 4.8-4.6s4.4 1.8 4.8 4.6" />
      <path d="M13.4 14.2c1.9.1 3.5 1.6 3.9 4" />
    </svg>
  );
}

/** Change tariff: water drop with a percent sign. */
export function WaterDropPercentIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c2.8 3.6 5 6.7 5 9.6a5 5 0 0 1-10 0c0-2.9 2.2-6 5-9.6Z" />
      <circle cx="10.3" cy="11.3" r="0.9" />
      <circle cx="13.7" cy="14.7" r="0.9" />
      <path d="M10.2 14.8l3.6-3.6" />
    </svg>
  );
}

/** Installment: water drop with rippled wave lines inside. */
export function WaterDropWavesIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c2.8 3.6 5 6.7 5 9.6a5 5 0 0 1-10 0c0-2.9 2.2-6 5-9.6Z" />
      <path d="M8.3 13.2c.9-.6 1.7-.6 2.6 0s1.7.6 2.6 0 1.7-.6 2.2-.3" />
      <path d="M8.3 15.8c.9-.6 1.7-.6 2.6 0s1.7.6 2.6 0 1.7-.6 2.2-.3" />
    </svg>
  );
}

export const serviceIconMap = {
  waterDrop: WaterDropIcon,
  waterDropSlash: WaterDropSlashIcon,
  waterDropDot: WaterDropDotIcon,
  waterMeter: WaterMeterIcon,
  twoPeople: TwoPeopleIcon,
  waterDropPercent: WaterDropPercentIcon,
  waterDropWaves: WaterDropWavesIcon,
} as const;

export type ServiceIconName = keyof typeof serviceIconMap;
