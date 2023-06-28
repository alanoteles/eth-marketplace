
import { CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { WalletBar } from "@components/ui/web3";
import {useAccount} from "@components/hooks/web3/useAccount";
import {useNetwork} from "@components/hooks/web3/useNetwork";

export default function Marketplace({courses}) {
  const { account } = useAccount()
  const { network, networkList } = useNetwork()
  console.log("net:", networkList)
  return (
    <>
      {/*{console.log("net:", networkList)}*/}
      <div className="py-4 text-black">
        <WalletBar
          address={account.data}
          network={network.data}
          networkList={ networkList }
        />
      </div>
      <CourseList
        courses={courses}
      />
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Marketplace.Layout = BaseLayout
