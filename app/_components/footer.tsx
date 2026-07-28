export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-between md:p-20 px-5 py-10 bg-[#4338CA] mt-7.5 gap-7 md:mt-13 text-white">
      <div className="flex flex-col gap-3 text-[14px]">
        <p className="text-[16px] font-bold italic">Movie Z</p>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex flex-row justify-between xl:gap-24">
        <div className="flex flex-col pr-5">
          <p>Contact information</p>
          <div className="flex gap-6 flex-col pt-3">
            <div>
              <p className="font-medium">Email:</p>
              <p>support@movieZ.com</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div>
          <p>Follow us</p>
          <div className="flex md:flex-row pt-3 flex-col gap-3">
            <p className="font-medium">Facebook</p>
            <p className="font-medium">Instagram</p>
            <p className="font-medium">Twitter</p>
            <p className="font-medium">Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
}
