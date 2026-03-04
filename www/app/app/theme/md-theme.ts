/**
 * Material Design 3 Theme Configuration
 * 
 * This file contains Tailwind CSS class collections for Material Design 3 components.
 * It uses the color tokens defined in the application's theme CSS.
 * 
 * @see https://m3.material.io/components
 */

/* -------------------------------------------------------------------------- */
/*                                 Typography                                 */
/* -------------------------------------------------------------------------- */

export const typeDisplayLarge = "text-6xl font-normal leading-tight tracking-tight";
export const typeDisplayMedium = "text-5xl font-normal leading-tight tracking-tight";
export const typeDisplaySmall = "text-4xl font-normal leading-tight tracking-tight";

export const typeHeadlineLarge = "text-3xl font-normal leading-snug";
export const typeHeadlineMedium = "text-2xl font-normal leading-snug";
export const typeHeadlineSmall = "text-xl font-normal leading-snug";

export const typeTitleLarge = "text-xl font-medium leading-normal";
export const typeTitleMedium = "text-base font-medium leading-normal tracking-wide";
export const typeTitleSmall = "text-sm font-medium leading-normal tracking-wide";

export const typeLabelLarge = "text-sm font-medium leading-5 tracking-wide";
export const typeLabelMedium = "text-xs font-medium leading-4 tracking-wide";
export const typeLabelSmall = "text-[11px] font-medium leading-3 tracking-wide";

export const typeBodyLarge = "text-base font-normal leading-6 tracking-wide";
export const typeBodyMedium = "text-sm font-normal leading-5 tracking-wide";
export const typeBodySmall = "text-xs font-normal leading-4 tracking-wide";

/* -------------------------------------------------------------------------- */
/*                                   Common                                   */
/* -------------------------------------------------------------------------- */

// Base transitions and focus states
export const transitionBase = "transition-all duration-200 ease-in-out";
export const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface";
export const disabledBase = "opacity-38 pointer-events-none cursor-not-allowed";

/* -------------------------------------------------------------------------- */
/*                                   Buttons                                  */
/* -------------------------------------------------------------------------- */

/**
 * Base classes for all buttons
 */
export const btnBase = `inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full ${typeLabelLarge} ${transitionBase} ${focusRing} cursor-pointer disabled:opacity-38 disabled:cursor-not-allowed disabled:shadow-none`;

/**
 * Elevated Button
 * Use for high-emphasis actions.
 * Structure: button.btnElevated > icon? + text
 */
export const btnElevated = `${btnBase} 
bg-surface-container-low text-primary shadow-sm 
hover:bg-surface-container-low/92 hover:shadow-md 
active:bg-surface-container-low/88 active:shadow-sm
dark:bg-surface-container-low dark:text-primary`;

/**
 * Filled Button
 * Use for high-emphasis actions.
 * Structure: button.btnFilled > icon? + text
 */
export const btnFilled = `${btnBase} 
bg-primary text-on-primary shadow-none 
hover:bg-primary/92 hover:shadow-sm 
active:bg-primary/88 active:shadow-none
dark:bg-primary dark:text-on-primary`;

/**
 * Filled Tonal Button
 * Use for medium-emphasis actions.
 * Structure: button.btnFilledTonal > icon? + text
 */
export const btnFilledTonal = `${btnBase} 
bg-secondary-container text-on-secondary-container shadow-none 
hover:bg-secondary-container/92 hover:shadow-sm 
active:bg-secondary-container/88 active:shadow-none
dark:bg-secondary-container dark:text-on-secondary-container`;

/**
 * Outlined Button
 * Use for medium-emphasis actions.
 * Structure: button.btnOutlined > icon? + text
 */
export const btnOutlined = `${btnBase} 
bg-transparent text-primary border border-outline 
hover:bg-primary/8 focus:border-primary 
active:bg-primary/12
dark:text-primary dark:border-outline`;

/**
 * Text Button
 * Use for low-emphasis actions.
 * Structure: button.btnText > icon? + text
 */
export const btnText = `${btnBase} 
bg-transparent text-primary px-3 
hover:bg-primary/8 
active:bg-primary/12
dark:text-primary`;

/* -------------------------------------------------------------------------- */
/*                                Icon Buttons                                */
/* -------------------------------------------------------------------------- */

export const iconBtnBase = `inline-flex items-center justify-center w-10 h-10 rounded-full ${transitionBase} ${focusRing} cursor-pointer disabled:opacity-38 disabled:cursor-not-allowed`;

export const iconBtnStandard = `${iconBtnBase} 
text-on-surface-variant 
hover:bg-on-surface-variant/8 
active:bg-on-surface-variant/12
dark:text-on-surface-variant`;

export const iconBtnFilled = `${iconBtnBase} 
bg-primary text-on-primary 
hover:bg-primary/92 
active:bg-primary/88
dark:bg-primary dark:text-on-primary`;

export const iconBtnFilledTonal = `${iconBtnBase} 
bg-secondary-container text-on-secondary-container 
hover:bg-secondary-container/92 
active:bg-secondary-container/88
dark:bg-secondary-container dark:text-on-secondary-container`;

export const iconBtnOutlined = `${iconBtnBase} 
bg-transparent text-on-surface-variant border border-outline 
hover:bg-on-surface-variant/8 hover:border-on-surface-variant 
active:bg-on-surface-variant/12
dark:text-on-surface-variant dark:border-outline`;

/* -------------------------------------------------------------------------- */
/*                        Floating Action Buttons (FAB)                       */
/* -------------------------------------------------------------------------- */

const fabBase = `inline-flex items-center justify-center gap-2 rounded-2xl shadow-md ${transitionBase} ${focusRing} cursor-pointer hover:shadow-lg active:shadow-md`;

export const fabSmall = `${fabBase} w-10 h-10 bg-primary-container text-on-primary-container`;
export const fabStandard = `${fabBase} w-14 h-14 bg-primary-container text-on-primary-container`;
export const fabLarge = `${fabBase} w-24 h-24 rounded-[28px] bg-primary-container text-on-primary-container icon-large`;
export const fabExtended = `${fabBase} h-14 px-4 bg-primary-container text-on-primary-container ${typeLabelLarge}`;

/* -------------------------------------------------------------------------- */
/*                                    Cards                                   */
/* -------------------------------------------------------------------------- */

/**
 * Card Container Base
 * Structure: 
 * div.card
 *   div.cardHeader
 *   div.cardContent
 *   div.cardActions
 */
export const cardBase = `rounded-xl overflow-hidden ${transitionBase}`;

export const cardElevated = `${cardBase} 
bg-surface-container-low shadow-sm 
hover:shadow-md
dark:bg-surface-container-low`;

export const cardFilled = `${cardBase} 
bg-surface-container-highest shadow-none 
hover:shadow-sm
dark:bg-surface-container-highest`;

export const cardOutlined = `${cardBase} 
bg-surface border border-outline-variant shadow-none 
hover:shadow-sm
dark:bg-surface dark:border-outline-variant`;

/* -------------------------------------------------------------------------- */
/*                                    Chips                                   */
/* -------------------------------------------------------------------------- */

export const chipBase = `inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg border ${typeLabelLarge} ${transitionBase} cursor-pointer`;

export const chipAssist = `${chipBase} 
bg-surface text-on-surface border-outline 
hover:bg-on-surface/8 
active:bg-on-surface/12
dark:bg-surface dark:text-on-surface dark:border-outline`;

export const chipFilter = `${chipBase} 
bg-surface text-on-surface-variant border-outline 
hover:bg-on-surface-variant/8 
active:bg-on-surface-variant/12
aria-selected:bg-secondary-container aria-selected:text-on-secondary-container aria-selected:border-transparent
dark:bg-surface dark:text-on-surface-variant dark:border-outline`;

export const chipInput = `${chipBase} 
bg-surface text-on-surface-variant border-outline 
hover:bg-on-surface-variant/8 
active:bg-on-surface-variant/12
dark:bg-surface dark:text-on-surface-variant dark:border-outline`;

export const chipSuggestion = `${chipBase} 
bg-surface text-on-surface-variant border-outline 
hover:bg-on-surface-variant/8 
active:bg-on-surface-variant/12
dark:bg-surface dark:text-on-surface-variant dark:border-outline`;

/* -------------------------------------------------------------------------- */
/*                            Segmented Buttons                               */
/* -------------------------------------------------------------------------- */

/**
 * Segmented Button - Material Design 3
 * Use for selecting between 2-5 options, switching views, or sorting elements.
 * @see https://m3.material.io/components/segmented-buttons/specs
 * 
 * Structure:
 * div.segmentedButtonContainer
 *   button.segmentedButtonItem (first) - apply segmentedButtonFirst
 *   button.segmentedButtonItem (middle) - apply segmentedButtonMiddle
 *   button.segmentedButtonItem (last) - apply segmentedButtonLast
 * 
 * Height: 40dp, Outline: 1dp, Fully rounded corners
 * Padding: min 12dp horizontal, 8dp between elements
 */

// Container for segmented button group
export const segmentedButtonContainer = `inline-flex items-center`;

// Base styles for all segmented button items
export const segmentedButtonBase = `
  inline-flex items-center justify-center gap-2 
  h-10 px-4 min-w-[48px]
  ${typeLabelLarge} 
  ${transitionBase}
  border border-outline
  cursor-pointer
  focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset
  disabled:opacity-38 disabled:cursor-not-allowed disabled:pointer-events-none
`;

// Unselected state (default)
export const segmentedButtonUnselected = `
  bg-transparent text-on-surface
  hover:bg-on-surface/8
  focus-visible:bg-on-surface/12
  active:bg-on-surface/12
`;

// Selected state
export const segmentedButtonSelected = `
  bg-secondary-container text-on-secondary-container
  hover:bg-secondary-container/92
  focus-visible:bg-secondary-container/88
  active:bg-secondary-container/88
`;

// Position variants for rounded corners (first, middle, last segments)
export const segmentedButtonFirst = `rounded-l-full border-r-0`;
export const segmentedButtonMiddle = `rounded-none border-r-0`;
export const segmentedButtonLast = `rounded-r-full`;
export const segmentedButtonSingle = `rounded-full`; // For single button scenarios

// Combined classes for convenience
export const segmentedButtonItemFirst = `${segmentedButtonBase} ${segmentedButtonFirst}`;
export const segmentedButtonItemMiddle = `${segmentedButtonBase} ${segmentedButtonMiddle}`;
export const segmentedButtonItemLast = `${segmentedButtonBase} ${segmentedButtonLast}`;

// State combinations for first segment
export const segmentedButtonFirstUnselected = `${segmentedButtonItemFirst} ${segmentedButtonUnselected}`;
export const segmentedButtonFirstSelected = `${segmentedButtonItemFirst} ${segmentedButtonSelected}`;

// State combinations for middle segments
export const segmentedButtonMiddleUnselected = `${segmentedButtonItemMiddle} ${segmentedButtonUnselected}`;
export const segmentedButtonMiddleSelected = `${segmentedButtonItemMiddle} ${segmentedButtonSelected}`;

// State combinations for last segment
export const segmentedButtonLastUnselected = `${segmentedButtonItemLast} ${segmentedButtonUnselected}`;
export const segmentedButtonLastSelected = `${segmentedButtonItemLast} ${segmentedButtonSelected}`;

/* -------------------------------------------------------------------------- */
/*                                 Text Fields                                */
/* -------------------------------------------------------------------------- */

/**
 * Filled Text Field
 * Structure:
 * div.textFieldFilled
 *   label
 *   input
 *   div.supportingText
 */
export const textFieldFilledContainer = `relative flex flex-col bg-surface-container-highest rounded-t-lg border-b border-on-surface-variant hover:bg-on-surface-variant/8 focus-within:border-primary focus-within:border-b-2 ${transitionBase}`;
export const textFieldFilledInput = `w-full px-4 pt-6 pb-2 bg-transparent border-none outline-none text-on-surface ${typeBodyLarge} placeholder-transparent peer`;
export const textFieldFilledLabel = `absolute left-4 top-4 text-on-surface-variant ${typeBodyLarge} transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary`;

/**
 * Outlined Text Field
 * Structure:
 * div.textFieldOutlined
 *   label
 *   input
 *   div.supportingText
 */
export const textFieldOutlinedContainer = `relative flex flex-col rounded-lg border border-outline hover:border-on-surface focus-within:border-primary focus-within:border-2 ${transitionBase}`;
export const textFieldOutlinedInput = `w-full px-4 py-3 bg-transparent border-none outline-none text-on-surface ${typeBodyLarge} placeholder-transparent peer`;
export const textFieldOutlinedLabel = `absolute left-4 top-3 ${typeBodyLarge} transition-all -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary`;

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

/**
 * Navigation Bar (Bottom)
 * Structure:
 * nav.navBar
 *   a.navItem
 *     span.icon
 *     span.label
 */
export const navBar = `flex justify-around items-center w-full h-20 bg-surface-container shadow-md dark:bg-surface-container`;
export const navBarItem = `flex flex-col items-center justify-center gap-1 w-full h-full text-on-surface-variant hover:bg-on-surface-variant/8 active:text-on-surface aria-selected:text-on-surface aria-selected:font-bold cursor-pointer ${transitionBase}`;
export const navBarIconActive = `bg-secondary-container text-on-secondary-container px-5 py-1 rounded-full`;

/**
 * Navigation Rail (Side)
 * Structure:
 * nav.navRail
 *   a.navItem
 */
export const navRail = `flex flex-col items-center w-20 h-full py-4 bg-surface shadow-sm dark:bg-surface`;
export const navRailItem = `flex flex-col items-center gap-1 py-4 w-full text-on-surface-variant hover:bg-on-surface-variant/8 active:text-on-surface aria-selected:text-on-surface cursor-pointer ${transitionBase}`;

/**
 * Navigation Drawer (Modal & Standard)
 * @see https://m3.material.io/components/navigation-drawer/specs
 */
export const navDrawer = `flex flex-col w-full max-w-[360px] h-full py-2 bg-surface-container-low rounded-e-[28px] shadow-lg dark:bg-surface-container-low ${transitionBase}`;
export const navDrawerStandard = `flex flex-col w-full max-w-[360px] h-full py-2 bg-surface rounded-e-[28px] border-r border-outline-variant dark:bg-surface ${transitionBase}`;

export const navDrawerItem = `flex items-center gap-3 mx-3 px-4 min-h-[56px] rounded-full text-on-surface-variant ${typeLabelLarge} font-medium cursor-pointer ${transitionBase} hover:bg-on-surface-variant/8 focus:outline-none focus:bg-on-surface-variant/12 active:bg-on-surface-variant/12 aria-selected:bg-secondary-container aria-selected:text-on-secondary-container`;

export const navDrawerHeadline = `flex items-center h-[56px] px-7 ${typeTitleSmall} text-on-surface-variant`;

/* -------------------------------------------------------------------------- */
/*                                  Selection                                 */
/* -------------------------------------------------------------------------- */

/**
 * Checkbox
 * Structure:
 * label.checkboxContainer
 *   input[type=checkbox]
 *   span.checkmark
 */
export const checkbox = `w-5 h-5 border-2 border-on-surface-variant rounded-sm checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/20 ${transitionBase} cursor-pointer`;

/**
 * Radio Button
 * Structure:
 * label.radioContainer
 *   input[type=radio]
 *   span.radioMark
 */
export const radio = `w-5 h-5 border-2 border-on-surface-variant rounded-full checked:border-primary checked:border-[6px] focus:ring-2 focus:ring-primary/20 ${transitionBase} cursor-pointer`;

/**
 * Switch
 * Structure:
 * label.switchContainer
 *   input[type=checkbox]
 *   span.track
 *     span.thumb
 */
export const switchTrack = `relative w-12 h-8 bg-surface-container-highest rounded-full border-2 border-outline transition-colors peer-checked:bg-primary peer-checked:border-primary cursor-pointer`;
export const switchThumb = `absolute left-1 top-1 w-4 h-4 bg-outline rounded-full transition-transform peer-checked:translate-x-4 peer-checked:bg-on-primary peer-checked:w-6 peer-checked:h-6 peer-checked:-top-0.5 peer-checked:-left-0.5`;

/* -------------------------------------------------------------------------- */
/*                                   Dialogs                                  */
/* -------------------------------------------------------------------------- */

/**
 * Basic Dialog
 * Structure:
 * div.dialogOverlay
 *   div.dialogContainer
 *     h2.headline
 *     div.content
 *     div.actions
 */
export const dialogOverlay = `fixed inset-0 bg-scrim/32 z-50 flex items-center justify-center p-4`;
export const dialogContainer = `bg-surface-container-high min-w-[280px] max-w-[560px] rounded-[28px] p-6 shadow-xl flex flex-col gap-4 dark:bg-surface-container-high`;
export const dialogHeadline = `${typeHeadlineSmall} text-on-surface`;
export const dialogContent = `${typeBodyMedium} text-on-surface-variant`;
export const dialogActions = `flex justify-end gap-2 mt-4`;

/* -------------------------------------------------------------------------- */
/*                                    Lists                                   */
/* -------------------------------------------------------------------------- */

/**
 * List Item
 * Structure:
 * li.listItem
 *   span.leadingIcon?
 *   div.content
 *     span.headline
 *     span.supportingText?
 *   span.trailingIcon?
 */
export const list = `flex flex-col w-full bg-surface py-2 dark:bg-surface`;
export const listItem = `flex items-center gap-4 px-4 py-3 hover:bg-on-surface/8 cursor-pointer ${transitionBase}`;
export const listItemContent = `flex flex-col flex-1`;
export const listItemHeadline = `${typeBodyLarge} text-on-surface`;
export const listItemSupportingText = `${typeBodyMedium} text-on-surface-variant`;

/* -------------------------------------------------------------------------- */
/*                                  Progress                                  */
/* -------------------------------------------------------------------------- */

export const progressLinearContainer = `w-full h-1 bg-surface-container-highest rounded-full overflow-hidden`;
export const progressLinearBar = `h-full bg-primary origin-left animate-progress`;

/* -------------------------------------------------------------------------- */
/*                                  Dividers                                  */
/* -------------------------------------------------------------------------- */

export const dividerBase = `bg-outline-variant`;

/**
 * Horizontal Divider (Full Width)
 * Use to separate content groups.
 */
export const dividerHorizontal = `${dividerBase} h-px w-full`;

/**
 * Horizontal Divider (Inset)
 * Indented 16dp (ml-4) from leading edge.
 */
export const dividerHorizontalInset = `${dividerBase} h-px w-[calc(100%-16px)] ml-4`;

/**
 * Horizontal Divider (Middle)
 * Indented 16dp from both edges.
 */
export const dividerHorizontalMiddle = `${dividerBase} h-px w-[calc(100%-32px)] mx-4`;

/**
 * Vertical Divider (Full Height)
 */
export const dividerVertical = `${dividerBase} w-px h-full`;

/**
 * Vertical Divider (Inset)
 * Indented from top and bottom.
 */
export const dividerVerticalMiddle = `${dividerBase} w-px h-[calc(100%-32px)] my-4`;

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export const divider = dividerHorizontal;
export const scrim = `bg-scrim/32`;

/* -------------------------------------------------------------------------- */
/*                                 Compatibility                              */
/* -------------------------------------------------------------------------- */

export const card = cardBase;
export const cardNeutral = cardFilled;
export const cardEleveted = cardElevated;
export const button = btnFilled;
export const filled = btnFilled;
export const outlined = btnOutlined;
export const mdTextField = textFieldOutlinedContainer;
export const mdTextFieldInput = textFieldOutlinedInput;
export const mdTextFieldLabel = textFieldOutlinedLabel;
export const buttonRoundedNormal = iconBtnStandard;
export const buttonRoundedSecondary = iconBtnFilledTonal;
export const chip = chipBase;
export const chipOutlined = chipAssist; // Mapping to Assist chip as it is outlined by default
export const errorMsg = "text-error";
