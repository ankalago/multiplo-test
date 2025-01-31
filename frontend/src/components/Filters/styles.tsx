import styled from 'styled-components'

export const WrapperImage = styled.div<{ className?: string }>`
  @apply ${({ className }) => className};
`

export const ContentImage = styled.div<{ className: string }>`
  @apply ${({ className }) => className};
`

export const FilterOriginal = styled.img<{ className: string }>`
  @apply ${({ className }) => className};
`

export const Filter1977 = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(110%) brightness(110%) saturate(130%);
  filter: contrast(110%) brightness(110%) saturate(130%);

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: screen;
    background: rgba(243, 106, 188, 0.3);
  }
`

export const FilterAden = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg);
  filter: contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg);

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: darken;
    background: -webkit-linear-gradient(to right, rgba(66, 10, 14, 0.2) 1, rgba(66, 10, 14, 0));
    background: linear-gradient(to right, rgba(66, 10, 14, 0.2) 1, rgba(66, 10, 14, 0));
  }
`

export const FilterAmaro = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg);
  filter: contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg);
`

export const FilterBrannan = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(140%) sepia(50%);
  filter: contrast(140%) sepia(50%);

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: lighten;
    background: rgba(161, 44, 199, 0.31);
  }
`

export const FilterBrooklyn = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(90%) brightness(110%);
  filter: contrast(90%) brightness(110%);
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: overlay;
    background: -webkit-radial-gradient(50% 50%, circle closest-corner, rgba(168, 223, 193, 0.4) 1, rgba(183, 196, 200, 0.2));
    background: radial-gradient(50% 50%, circle closest-corner, rgba(168, 223, 193, 0.4) 1, rgba(183, 196, 200, 0.2));
  }
`

export const FilterClarendon = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(120%) saturate(125%);
  filter: contrast(120%) saturate(125%);
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: overlay;
    background: rgba(127, 187, 227, 0.2);
  }
`

export const FilterInkWell = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(110%) brightness(110%) sepia(30%) grayscale(100%);
  filter: contrast(110%) brightness(110%) sepia(30%) grayscale(100%);
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    background: rgba(0, 0, 0, 0);
  }
`

export const FilterLofi = styled.img<{ className: string }>`
  @apply ${({ className }) => className};

  position: relative;
  -webkit-filter: contrast(150%) saturate(110%);
  filter: contrast(150%) saturate(110%);
  .filter::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: multiply;
    background: -webkit-radial-gradient(50% 50%, circle closest-corner, rgba(0, 0, 0, 0) 70, rgba(34, 34, 34, 1));
    background: radial-gradient(50% 50%, circle closest-corner, rgba(0, 0, 0, 0) 70, rgba(34, 34, 34, 1));
  }
`
