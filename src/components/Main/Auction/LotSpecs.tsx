import React from "react";

export type Spec = { label: string; value: string };

export default function LotSpecs({ specs }: { specs: Spec[] }) {
    // Розділяємо масив навпіл
    const mid = Math.ceil(specs.length / 2);
    const left = specs.slice(0, mid);
    const right = specs.slice(mid);

    return (
        <section>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[left, right].map((group, idx) => (
                    <dl
                        key={idx}
                        className="overflow-hidden rounded-xl border border-zinc-800 dark:border-zinc-100 grid grid-cols-[2fr_3fr]"
                    >
                        {group.map((s) => (
                            <React.Fragment key={s.label}>
                                <dt className="text-xs uppercase font-bold tracking-wide text-black dark:text-gray-200 border-b border-r border-zinc-800 dark:border-zinc-100 p-3 bg-zinc-200 dark:bg-zinc-900/40">
                                    {s.label}
                                </dt>
                                <dd className="text-sm font-medium text-black dark:text-gray-200 border-b border-zinc-800 dark:border-zinc-100 p-3">
                                    {s.value}
                                </dd>
                            </React.Fragment>
                        ))}
                    </dl>
                ))}
            </div>
        </section>
    );
}
