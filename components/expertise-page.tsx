'use client';

import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { ArrowLink, SiteFooter, SiteHeader } from '@/components/saksouk-site';
import { assetUrl } from '@/lib/site-paths';

const ease = [0.22, 1, 0.36, 1] as const;

export function ExpertisePage() {
  const { content, lang } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>(content.expertise.areas[0].key);
  const reduce = useReducedMotion();
  const active = content.expertise.areas.find((area) => area.key === activeKey) ?? content.expertise.areas[0];
  return <main><SiteHeader /><motion.section className="inner-hero expertise-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}><div className="container inner-hero-grid"><div><p className="section-label"><span />{content.expertise.eyebrow}</p><h1>{content.expertise.title.map((line, index) => <span key={index}>{line}</span>)}</h1></div><div className="inner-intro"><p>{content.expertise.introduction}</p><ArrowLink href="/#contact" primary>{lang === 'ar' ? 'تحدث مع فريقنا' : 'Talk to our team'}</ArrowLink></div></div></motion.section><motion.section className="expertise-section" initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-7%' }} transition={{ duration: .8, ease }}><div className="container"><label className="expertise-select"><span>{lang === 'ar' ? 'مجال الخبرة' : 'Area of expertise'}</span><select value={activeKey} onChange={(event) => setActiveKey(event.target.value)}>{content.expertise.areas.map((area) => <option value={area.key} key={area.key}>{area.title}</option>)}</select></label><div className="expertise-tabs" role="tablist" aria-label={lang === 'ar' ? 'مجالات الخبرة' : 'Areas of expertise'}>{content.expertise.areas.map((area) => <button role="tab" aria-selected={activeKey === area.key} className={activeKey === area.key ? 'active' : ''} onClick={() => setActiveKey(area.key)} key={area.key}>{area.title}</button>)}</div><AnimatePresence mode="wait"><motion.article className="expertise-detail" key={active.key} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .45, ease }}><div className="expertise-copy"><div className="expertise-kicker"><i><ArrowUpRight size={20} /></i><span>{active.title}</span></div><h2>{active.summary}</h2>{active.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><div className="expertise-image"><motion.img src={assetUrl(active.image)} alt={active.title} loading="lazy" decoding="async" initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: .8, ease }} /></div></motion.article></AnimatePresence></div></motion.section><SiteFooter /></main>;
}
