import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function useSendEmail() {
  useEffect(() => {
    emailjs.init({
      publicKey: "WN4cF3C99Ng03mSTK",
      blockHeadless: true,
      blockList: {
        list: ["foo@emailjs.com", "bar@emailjs.com"],
        watchVariable: "userEmail",
      },
      limitRate: {
        id: "app",
        throttle: 10000,
      },
    });
  }, []);

  async function sendEmail(data) {
    try {
      const response = await emailjs.send(
        "service_nv2qbek",
        "template_4ns3bwt",
        {
          to_name: data.to_name,
          from_name: data.from_name,
          message: data.message,
          to_email: data.to_email,
          from_email: data.from_email,
        },
      );
      if (response.status === 200) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }

  return { sendEmail };
}
