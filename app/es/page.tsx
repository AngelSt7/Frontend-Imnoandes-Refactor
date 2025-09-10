import NavigationCard from "@/src/components/es/NavigationCard/NavigationCard"
import ActionsSections from "@/src/components/es/sections/ActionsSections"
import DiscoverSection from "@/src/components/es/sections/DiscoverSection"
import FeaturesSection from "@/src/components/es/sections/FeaturesSection"
import PropertiesSection from "@/src/components/es/sections/PropertiesSection"
import StatsSection from "@/src/components/es/sections/StatsSection"


export default async function page() {
    return (
        <div className=" mt-4 w-[92%] max-w-[1400px] mx-auto rounded-xl font-semibold  p-2">
            <ActionsSections />
            <NavigationCard />
            <FeaturesSection />

            <DiscoverSection />
            <PropertiesSection/>
            <StatsSection />
            {/* <ExtrasPropertiesSection /> */}
        </div>
    )
}