import { Fragment } from 'react';
import styles from './text.module.scss';
import { cn } from '../../utils';

interface TextProps {
  label: string;
  title?: string;
  isWhite?: boolean;
  isPrimary?: boolean;
  isPrimaryWhite?: boolean;
  isGray?: boolean;
  isLetterSpacing?: boolean;
  isBreakLine?: boolean;
  isUnderLine?: boolean;
  styleColor?: string;
  type?: 'main' | 'preview';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'thin' | 'normal' | 'medium' | 'bold';
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  className?: string;
  cursor?: 'pointer' | 'text' | 'not-allowed';
  isCenter?: boolean;
  callBack?: (value: string) => void;
}

const Text = ({
  label,
  title,
  size = 'md',
  weight = 'medium',
  transform = 'none',
  type = 'main',
  styleColor = 'transparent',
  isWhite = false,
  isPrimary = false,
  isPrimaryWhite = false,
  isGray = false,
  isBreakLine = false,
  isLetterSpacing = true,
  isUnderLine = false,
  className = '',
  cursor = 'text',
  isCenter = false,
  callBack,
}: TextProps) => {
  const cssNames = () => {
    return [
      styles['text'],
      styles[`text-${size}`],
      styles[`text-${weight}`],
      styles[`text-${transform}`],
      styles[`text-${cursor}`],
      callBack && styles[`text-bgHover`],
      isPrimary && styles['text-primary'],
      isPrimaryWhite && styles['text-primary-white'],
      isGray && styles['text-gray'],
      isLetterSpacing && styles['text-letter-spacking'],
      isBreakLine && styles['text-breakline'],
      isUnderLine && isPrimary && styles['text-underlinePrimary'],
      isUnderLine && !isPrimary && styles['text-underline'],
      isWhite && !isPrimary && styles['text-white'],
      isCenter && styles['text-center'],
    ].join(' ');
  };

  return (
    <Fragment>
      {type === 'main' && (
        <p title={title} className={cn(cssNames(), className)}>
          {label}
        </p>
      )}
      {type === 'preview' && (
        <p
          title={title}
          style={{ color: styleColor }}
          className={cn(cssNames(), className)}
        >
          {label}
        </p>
      )}
    </Fragment>
  );
};

export default Text;
