import { useEffect, useRef, useState } from 'react';
export default function useNearScreen({ distance = '100px', threshold = 1.0, root = null, externalRef } = {}) {
    const fromRef = useRef();
    const [isNearScreen, setshotw] = useState(false)
    useEffect(() => {
        let observer

        const element = externalRef ? externalRef.current : fromRef.current;
        const onChange = (entries) => {
            const el = entries[0]
            if (el.isIntersecting) {
                setshotw(true)
            } else {
                setshotw(false)
            }
        }
        observer = new IntersectionObserver(onChange, {
            root: root,
            rootMargin: distance,
            threshold,
        })

        if (element) observer.observe(element)

        //return () => observer && observer.disconnect()
    }, [])

    return { fromRef, isNearScreen }
}