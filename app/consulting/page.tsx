import { Metadata } from 'next'
import SiteBase from "@/components/SiteBase"
import Image from "next/image"
import { fullName, SITE_URL } from "@/lib/content"
import consultingPhoto from '@/public/covers/consulting.jpg'

export const metadata: Metadata = {
  title: 'Consulting',
  description: `${fullName} - consulting services.`,
  openGraph: {
    title: 'Consulting | William [dot] Computer',
    description: `${fullName} - consulting services.`,
    url: `${SITE_URL}/consulting`,
  },
}

export default function Consulting() {
  return (
    <SiteBase title="Consulting" description={`${fullName}'s consulting offerings.`}>
      <div className="flex flex-col gap-6 pt-2">
        <div>
          <p>
            I offer consulting services for AI strategy and solutions. I bring 8 years of AI research and engineering experience, with over 5 years of LLM expertise. I was one of the first to use GPT-3 in 2020, and since have received patents for my work at Microsoft and beyond.
          </p>
          <br />
          <p>
            AI is a chaotic field that moves rapidly -- often standard advice flips monthly. I'm engaged with both the academic literature and the engineering best practices of top startups in SF, where I'm based. I can help you navigate this landscape and succeed where others fail.
          </p>
          <br />
          <p>
            I am currently retained as the Director of AI at Therap Services, a mid-market healthcare software company with over 500 employees transacting billions of dollars of Medicaid billings, where I've led design and development of their flagship AI products.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="flex flex-col gap-6 md:w-1/2">
            <div>
              <h2 className="font-title text-lg pb-2">Services</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>AI strategy and architecture review</li>
                <li>Prototyping and proof-of-concept development</li>
                <li>AI-readiness and transition planning, organizational development, and management consulting</li>
                <li>Technical due diligence</li>
              </ul>
            </div>

            <div>
              <h2 className="font-title text-lg pb-2">Get in Touch</h2>
              <p>
                Interested in working together? Reach out via the <a href="/contact" className="underline hover:italic">contact page</a> or <a href="mailto:hello@william.computer" className="underline hover:italic">email</a>.
              </p>
            </div>
          </div>

          <div className="md:w-[40%]">
            <div className="bg-[#f7f5ed] p-4 shadow">
              <Image
                alt="Speaking at Therap National Conference"
                src={consultingPhoto}
                className="w-full"
                quality={95}
                priority
              />
              <p className="text-center text-sm mt-3 italic">Speaking at the 2026 Therap National Conference</p>
            </div>
          </div>
        </div>
      </div>
    </SiteBase>
  )
}
