import { useCallback, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';

export type UseGenerateImage<T extends HTMLElement = HTMLDivElement> = [
  (callback?: BlobCallback) => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<T | null>;
  },
];

export function useGenerateImage<T extends HTMLElement = HTMLDivElement>(): UseGenerateImage<T> {
  const ref = useRef<T>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = useCallback(async (callback?: BlobCallback) => {
    if (ref !== null && ref?.current) {
      setIsLoading(true);

      const blob = await domtoimage.toBlob(ref.current);
      setIsLoading(false);

      if (callback) {
        callback(blob);
      }
      setIsLoading(false);
      return blob;
    }
  }, []);

  return [
    generateImage,
    {
      ref,
      isLoading,
    },
  ];
}
