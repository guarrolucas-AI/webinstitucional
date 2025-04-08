import Image from "next/image"

export default function TeamSection() {
  return (
    <div className="relative min-h-screen w-full p-6 md:p-12">
      {/* Gradient effects */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-red-600/20 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-green-600/20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]"></div>

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">Team</h1>
          <p className="text-xl text-gray-400">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          </p>
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          {/* CEO */}
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white/10">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Lucas Guarro"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white">CEO fundador</h2>
                <p className="text-xl text-gray-400">Lucas Guarro</p>
              </div>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              </p>
            </div>
          </div>

          <hr className="border-gray-800" />

          {/* Co-fundador */}
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white/10">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Alina Alonzo"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white">Co-fundador</h2>
                <p className="text-xl text-gray-400">Alina Alonzo</p>
              </div>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              </p>
            </div>
          </div>

          <hr className="border-gray-800" />

          {/* Gerente */}
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white/10">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Micaela Enriquez"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white">Gerente</h2>
                <p className="text-xl text-gray-400">Micaela Enriquez</p>
              </div>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

