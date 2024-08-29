import { FC, useState, useEffect } from 'react';

/**
 * @description 打字机效果
 * @param text 文本
 * @param typingSpeed 打字速度
 * @param className 类名
 */
const Typewriter: FC<{ text: string; typingSpeed: number; className: string }> = ({ text, typingSpeed, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [oldText, setOldText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 0) {
      setOldText(text);
    }
    if (text !== oldText) {
      setCurrentIndex(0);
      setDisplayText('');
    }
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [text, typingSpeed, currentIndex, oldText]);

  return <div className={className}>{` ${displayText}`}</div>;
};

export { Typewriter };
