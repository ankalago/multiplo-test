import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import styled from 'styled-components'

export const LikeComponent = styled(HeartSolid)`
  &.like{
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(225, 29, 12, 0.5);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(225, 29, 12, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(225, 29, 12, 0);
    }
  }
`
