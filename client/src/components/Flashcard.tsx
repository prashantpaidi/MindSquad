import { useState } from 'react';

interface FlashcardProps {
    front: string;
    back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
                perspective: '1000px'
            }}
            className="cursor-pointer h-[200px]"
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
                {/* Front */}
                <div
                    className="absolute w-full h-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center p-6 text-center"
                    style={{
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <h3 className="text-xl">{front}</h3>
                    <div className="absolute bottom-2.5 right-2.5 text-xs font-[family-name:var(--font-mono)]">FRONT</div>
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full bg-[#ccff00] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center p-6 text-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <p className="text-lg font-bold">{back}</p>
                    <div className="absolute bottom-2.5 right-2.5 text-xs font-[family-name:var(--font-mono)]">BACK</div>
                </div>
            </div>
        </div>
    );
}
