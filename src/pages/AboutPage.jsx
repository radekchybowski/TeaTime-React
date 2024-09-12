import { FaUniversity } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"

const AboutPage = () => {
    return (
      <>
        <div className='h-full flex justify-center'>
          <div className="flexflex-col">
          <FaUniversity size="90"/>
            <h2 className='text-3xl mt-5'>About / O serwisie</h2>
            <h3 className='text-2xl mt-5 mb-2'>Autorem niniejszego serwisu jest Radosław Chybowski.</h3>
            <h3>Serwis ten stanowi integralną część pracy licencjackiej (kierunek: elektroniczne przetwarzanie informacji), przygotowanej pod kierunkiem dr hab. Janusza Jurka prof. UJ na Wydziale Zarządzania i Komunikacji Społecznej Uniwersytetu Jagiellońskiego.</h3>
            <br />
            <Separator />
            <h3 className='text-2xl mt-5 mb-2'>The author of this website is Radosław Chybowski.</h3>
            <h3>This website is an integral part of a bachelor's thesis (field: electronic information processing), prepared under the supervision of Dr. habil. Janusz Jurek, professor at Jagiellonian University, at the Faculty of Management and Social Communication, Jagiellonian University.</h3>
          </div>
        </div>
      </>
    );
};

export default AboutPage;