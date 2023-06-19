import { ArrowSmallDownIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { normalizedSpecies } from '@/data/temtem/species'
import { traitsByName } from '@/data/temtem/traits'
import type { Species } from '@/models/Temtem/Species'
import { formatEvolutionTree, iconImage } from '@/models/Temtem/Species'
import { temTypeImage } from '@/models/Temtem/Type'
import { findItem } from '@/utils/dict'

import type { ComponentProps, FC } from 'react'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'w-[1px] whitespace-nowrap border border-primary px-2 py-1 text-center',
      className
    )}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'border border-primary px-2 py-1 text-center',
      className
    )}
    {...props}
  />
)

type Props = {
  species: Species
}
export const GeneralDetails: FC<Props> = ({ species }) => {
  const evolution = (() => {
    if (species.evolution.evolves) {
      const formatted = formatEvolutionTree(
        species,
        species.evolution.evolutionTree
      )
      if (formatted.type === 'multiple') {
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Image
                alt={species.nameJa}
                src={iconImage(species)}
                width={30}
                height={30}
              />
              <div>
                <Link
                  href={`/species/${species.number}`}
                  className="link-hover link-primary"
                >
                  {species.nameJa}
                </Link>
              </div>
            </div>
            <div className="flex justify-center font-bold text-primary">
              <ArrowSmallDownIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1">
              {formatted.trees.map((tree, i) => (
                <div key={i} className="flex gap-1">
                  {tree.map((item) => {
                    const tem = findItem(normalizedSpecies, String(item.number))
                    return (
                      <div key={tem.number} className="flex items-center gap-2">
                        <Image
                          alt={tem.nameJa}
                          src={iconImage(tem)}
                          width={30}
                          height={30}
                        />
                        <div>
                          <Link
                            href={`/species/${tem.number}`}
                            className="link-hover link-primary"
                          >
                            {tem.nameJa}
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            {formatted.tree.map((item, i) => {
              const tem = findItem(normalizedSpecies, String(item.number))
              return (
                <>
                  <div key={tem.number} className="flex items-center gap-2">
                    <div>
                      <Image
                        alt={tem.nameJa}
                        src={iconImage(tem)}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/species/${tem.number}`}
                        className="link-hover link-primary"
                      >
                        {tem.nameJa}
                      </Link>
                    </div>
                  </div>
                  {i !== formatted.tree.length - 1 && (
                    <div
                      key={tem.number}
                      className="flex justify-center font-bold text-primary"
                    >
                      <ArrowSmallDownIcon className="h-5 w-5" />
                    </div>
                  )}
                </>
              )
            })}
          </div>
        )
      }
    } else {
      return <div>進化しない</div>
    }
  })()

  return (
    <section className="border border-primary">
      <table className="w-full border-collapse border border-primary"></table>
      <h3 className="bg-primary p-2 text-center text-xl font-bold text-white">
        {species.nameJa}
      </h3>
      <div className="flex flex-col gap-1">
        <div className="flex justify-center">
          <Image
            alt={species.nameJa}
            src={iconImage(species)}
            width={60}
            height={60}
          />
        </div>
        <table className="w-full border-collapse border-y border-primary">
          <tbody>
            <tr>
              <Th className="border-l-0">No.</Th>
              <Td className="border-r-0">{species.number}</Td>
            </tr>
            <tr>
              <Th className="border-l-0">タイプ</Th>
              <Td className="border-r-0">
                <div className="flex w-full justify-center gap-2">
                  {species.types.map((type) => (
                    <Image
                      key={type}
                      alt={type}
                      src={temTypeImage(type)}
                      width={30}
                      height={30}
                    />
                  ))}
                </div>
              </Td>
            </tr>
            <tr>
              <Th className="border-l-0">個性</Th>
              <Td className="border-r-0">
                {species.traits.map((traitName) => {
                  const trait = findItem(traitsByName, traitName)
                  return (
                    <Link
                      href={`/traits/${trait.key}`}
                      key={trait.key}
                      className="link block"
                    >
                      {trait.nameJa ?? trait.name}
                    </Link>
                  )
                })}
              </Td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col items-center">
          <p className="font-bold">進化</p>
          <div className="py-2">{evolution}</div>
        </div>
      </div>
    </section>
  )
}
