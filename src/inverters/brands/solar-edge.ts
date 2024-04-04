import {InverterSettingsDto, InverterStatus} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

/* Solaredge Status Codes
* source https://knowledge-center.solaredge.com/sites/kc/files/sunspec-implementation-technical-note.pdf
*
* 1 = Off
* 2 = Sleeping (auto-shutdown) – Night mode
* 3 = Grid Monitoring/wake-up
* 4 = Inverter is ON and producing power
* 5 = Production (curtailed)
* 6 = Shutting down
* 7 = Fault
* 8 = Maintenance/setup
*/

export class SolarEdge extends InverterSettingsDto {
    brand = InverterModel.SolarEdge;
    statusGroups: InverterStatus = {
        standby: {states: ['0', '1', '2', '3', '6', 'standby', 'stand-by'], color: 'blue', message: localize('common.standby')},
        selftest: {states: ['8', 'selftest', 'self-checking'], color: 'yellow', message: localize('common.selftest')},
        normal: {states: ['4', 'normal', 'ok'], color: 'green', message: localize('common.normal')},
        alarm: {states: ['5', 'alarm'], color: 'orange', message: localize('common.alarm')},
        fault: {states: ['7', 'fault'], color: 'red', message: localize('common.fault')},
    }
    image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABICAYAAABWWr1vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAABN+SURBVGhDtVvZj15HVq/vflu7vXS37djujp1FWZyQxDAJkMlEaDQSA0iIB3jhjXdeEK+IfwAkBg1CzPDG/4CQIqRBQZpBoEGazJDJZmcb29m8xHtv38ZvOafu7bZHgDSc+506a52qU3Vv1a3bdq/8H+D1118fnFlbO7qzWDw0L+VEr1mcKotmY7GYb/Sa5kSzWBxblLJGROCV0jRLpSwO93q9PrDoAgUxhSPKO9DeWvQWN+F2A/JVeH9RFr0v+k3z2aLMPhkOms/m/aUrg8Hgxvr6+r3ozs8FxHgwvPfGGw9P5vMX0PiLs155preYPwn3M4te78TSeDwaj8dlMOirc4v5oswX8zKfzctsDkqEjD6LJzSRBCrw56So7/fLoGlKH7Q/GEgW32/g06D+rEwn07K5ubXoNb0bqHalV5qf9frNhX4zeG9na+vtZjZ775GzZz9RQEBN6rXXXltfHY1eObS28k308eX5dHb2yMqR5eFoVDATZTqdCidohEmwgw0Kjv6CUdjZ6LSigqJbstGHPyVGgB+TQidtZz1A+imGiGmTSfcHZTgkDstwMMQANOXmjZtlZ2dnc/XosTcPHznyfdT5h96f/NEfn3v+K+e+tX765MunH9k4vLK6Wqazadna3FZwzEHbOTbCzrBBXTn41LN56/WjH/VStrzKKGqSIWddFfqxXtgUI82WmezO9nbhwJ88tQ46LpcvfTZrTp0+84eTWe83z7/70eG7d++Wm7ducarLDInFkCIhB1GwuBKsFxcYOvBKWJdBWtg4SKkj2JuFp6wHal+Joo5mIdQCaqfTWdnc2irXrl0vX964frM5cfr49PNPPyw3MI0LT4ddWVnBACgiJCguKQG4fexnhfxZsDplaQHUi5ip9QHkFVs6x9IVMbOmiAuQtCUsdGtu37ld/uWf/vGd5uKF84NPP/ygPP7Yw2WA+xWZuZHMIgK5KT5HoOx0BGZpWaKANnUc6ASidvWBlAPCCwuCdGnP2LQLJVXaQtp7ZTKZlI0zZ8rLv/7KoWYwWBp99eu/VU6dWccqsxsV6c+sIrhKAgKYqLOSgtcYsDLQNiJXMHcmk6RAWQJ/JvILjsbw6VBeECy3vCkYTgYWk3Nffflcc+3qzcFoaYTleAYPj5jAtQ0ZAKw7B5lSdYnAZmWTzJ8oZRtJ3BGZrZERz5H05A3mQ2cXyeIFZjT8nHmsytPJhOtHGXPJtkOMMoLQMXlVJaWsi6JakJ2rmC75ENNfNcPW2M9GUd126AxVWY8dYgclK0zbTvrIErxsJmLmSIz5HbJCS4AcuCcwgPUtUaKB2qri+fM2a7TOlzZgbsrE2JDZKH3m9NuDjkc/b+Zsg/XDv1M/9dR5le4khnZ50x9kd6jORETca9EMTJGVaOZo1cQJ4qN+2ExjhmL0G1Ahebh79uAju5/B1t6Rw542xce08g2EPAq1zX7CjhcOVqQTOkzjFM8XO8Gb0wFJjQykYMlnXdLwlV2y62disoWvUDbXM+XtFzGpY7xITAmHXyJtTdPPsRREUlaB2lmja5STaNQKn+RFwtfqUAI0qdXHVLqA9G9rECwxnutDDj+XjqD2qq4t41YqzZz5Z6t0JQubKqVehDbL1R9UvOS9NtYX1/UVQWlDVLN9f+xanwDG6sqAspPq6H2Ad0LOqY22R8VwZiNiO3LSUNldyCJoF9KXhVxwhUutF3z1sUqMWDlKI7DWii6n2w+Pv54pd8imhCoGI5JIAoU7xCbIB0fqAhJ1crbNUkDwcrJnLWv94EPf7adsYpJ6EeNzCUFFu+vz3mTA+pDywbVPvUIPNpB8q68mMuGSYF042KtlXQikDZ1526xKW8pAdJuAIxHvvdjNoaAv3wExg94ztDfMhMknnWGV5MFQ+wV9KINy9dRhEX7ySXvQepCMQyV9TNMP5930Vfy0k7b1bfc+JUDfmZceKCbkJJWWglLhpRFXzBgz9jJtxPNYKTds7hmUB6DSYbnFEdwHPPA+6IUNB7w+Ts48PScOSfG23R84Bnnq+QbOepIDM+YAh8W8G/g8seMNbjklFX1WWtjS1bD0oE7CHW5vSdDYSyQreSOKlgdYRTnpPnucsCQHJu/L9ciQd+FBTyFWcyXGhSKSihodR/PMPefRPpRscoMuIipjiUiZIfb47+HFom7o/MNFSh2RjzNZya2Ny0L1AfDVi4AF3RE58tkvOcnbhDt3ViTs77CMEChKlfoU5JidMS+bFXZDqRfoULcAAYZaT2B+jxshk1IpK3MDo0bs7uDBk+pnuerpT71o6NImmiNFsJ6Qvqpc/SsL4tqKnTyvrEdIX+hyVWCJR6U/bztjpOH+yprsaIT2LCjzEmNMAK9nT4xlFt3YUuu5lIXLVjW4s7ZRlo6EetkDocuUyOPu0wc2We3cDWKZgt8BW1CQmG4+nLos2gZ3ytVGPfl9yOfg/uOIn4+ZEMu2thDaQcXn0QOIJT+aVT0WXCiW3W2W3K9wnsIyPJtyD/C+oP0HyE9n/HKj/ST3ltwzuJ9QVyn3G9DohBrX/sN63rPUOdIHdboieihbUPFtffozKw+50+O9seRJi9mAfjadxjIee07dM1ocdnhu1u1HxpCxf5BPP9q9F4WPdMNO3fBlDPnCFn7Cbvv9rm3ou4IpoSBtwAyYS35ry1uOXz+56il3GUi6t6ZUisRgYnmlHjTUAvI1loLYP5iA1AMZtzUApA1sSfbXYCX63cMpi6DW9KNJt6N+rsR6qkue7lEStPLgJz/KcuzQxJAJjpmLCCOkzZSu5ETlKy2L+yDz40BQ4j6F8zBY11YA99DBFIe+0hOtr1LoRTqQcnY6zY5v6FbJJZm6Wkf7IzW128CIJTuZFvKO4QvtSI5yYgVfFVgzRL77kvWtAaBQMZyqv+XWL/Vkg+mCfMy2AvC+hgik6ANsqSXvmeIz1ZSRDGkF0qRRCnDCXlXI5ACYlwML682ZUlYYSqGnL/WqEz5U6erKASmLGm2U0ijeiRHY5Dh46F2Jq52WU85ILJ0+FpDvLMlcvqe5vMeRA0iamFtD1VEGJj/ln4gmszLRn4pAJ7vAqeTJdALdZA9vhK/qW9Y0ZEbof4NODXKl84slM8fmx6SIcBbPBIUwArk/6Cb0IAn2UMRJyrfpRM0c61CON3xS28hzK6HsIw2pkCcE2XjEoQ2Dz+MMMPucM9mcfPhEf7KLgxYbwpVJaA+JvWLPHkTUnuI9hht1u2e0OKz7Suxz4Ftf7nvQd2TxeU6SP89c5nm+yvMZkzO1TclGQhwMzNzl5uHTDw0vfvheuXr1Szk5Z06GL3EgmiWbglIp5udAGCuhf1tHJGJSzXbZhjnD/hYTHtCTMhqNywdvv1X+8wf/Om3u3b4zvH7tetm6u+XMOYVwYqnw8dqPn9sDSl/9OjqychQTxEbFSxug5QC1Dgt0sYrBaEen3q9x1jqhrMpj/fGTJ8v66UdLc/nitd6JjUfLxulTePimcpV7OFcaTVS1BEt8s95jI7Z9q1SBIdAmIB9GbhbVr0I6tqDJDOCMpcxXu5Wjx8vDjzy+3uzs7A6fOvtEGR3AdhUODK4m0GI2Ksgkkoo3o8G02krJVaFSPoRaHzSUKqHvzmbGEaEtVPtBKhRcEcdLozFfk4b8kz6WszSrZn57oE4Ba1D7UNpvT15Ayl9QymYlSLbBkM9J24uwQcHZaJEeiV1gZCxy2BaYFLrfAjvBFYV/biQy4an2EMrYL6RP2uF37Zt1KBN3ZbN+l7Jwt0OxLwnpZ1461QsaOCVFX3bVjnE64z4FyPsQyXDlZyaWIjueh3IJ5acs7WNaXr1P5DJNzOXZS3boqdPxoV2y7ZP6zhFFx4+Rtwwh+ZRBR6DE9EPdUfpqy8FjU8GJYbFzMu2tQR6zhU402B/yW54wOpy8kk0+fLSCxn4iOah9odedgJaA1ItC59sdcuWNOdKW3U+DE0ixvSERzxPlyixltNXAQF25GkGD1SrUCiq6z8h+UOfIVGP4hux+8IRLBgV/+zsFzD+dVggRg8Yd2WFI1BgpR8YSBS/RrBQ+ssnHesshdICqBJlTY8FyqoJmhAax6gDsAXu0ZzBDDqRuP1XMiID7glCR0bEE125j9MRnXQvVrwt7khFUTVtPQL0v8vkPVvJuSj9NHFBVxSbHmeJ9rUqQQt/9clRDSWW/bLILjpHa8Nvn1LEG39WIoE52LmLwBVjWbkzw+WJMkTKrRVVmFJ6sRMRj5pqG4H1LRy2o2qYNuudTGYxUqhgx9mBwMeT0y69G+UVppq9HPu7oyINVOY8//muL9Y5IYFQf551XrDhcmQh1f8i9Bsj9gfuL9hTuEZSp594ie+431qk+z0I6IzmG69KPsVwv9zGemXL/0flJbeS5y0npc50Sc8IaE0IMPkuuEvjFhYRyxMajEd58sScQY78gT33dOwJH8g0cd3gi9hNS7iuOR/04cMmUdVRvrPhG2iPGuOX5z+DUbuxV3GI4O8yOCTJHbB+eIedp0LOhzCNZcYE0pY71cm/hpTp2Sr7qBF0+hziAYqKgo+AHS3ISKUvST/2IuFrC8MPdx40q/ALUEf8AtmTHtYzSkJ3NVW7fUk7IxgiVb1X3AU17F00KraJrUn/Uh1arpNFDL+m84lmyI11ByXcrh4qMCCmTCV1CcjVNxaEE+sClniV99JNcORGvZ1EEGrI/Bt6CXCiYDCy8tGiEmZQVlFAknJVr4iTA6JKF4KQV28o26wmQnPUFVUiFgaPf2RkreFbsn9sAS/bNC4VbJ5N+RoE7TB+rwxB1UlYM/qSn1lSg2dGGExZcMtme7bNUGBRuL/xc0EU8be0EoER8XwY9U7k3ZYf4Bp2rUK5+Y9K6snEV9EpYVyisRNTxI43eolWvUzf10gWOoKt+lEnb+KNx2vLjDz/4+G3fL9sN1pAZb7qas5L+9l98e/Hsc0+XteOr5eChg2VldaVcvPRJ+fSLqwrCNw6+eTPf+p6oAL5/NSC5ggLlo7FxK/IX5G0HTozrkzddeB/SxrvQKdb7kb85pp3ISBPsWzs7O+XXfuVceeLxR9EH/0lge3u39P72L/9mcfa5p8rq8bVy8OByOX7saHn93/6j/OCHPypL2B8E2a//AWoCD/LPjAKUIn7cZ7LzFaDfxUzNeGRBMg0/pMKvAgZshM16urlV/uD3fqe8dO55v9EDmJRWv3zX8+2HGUHW/B8CY9xuQtxe/xvU7aNb6AEYtgMHlsp4aQx6QIO4dfcu1o4F+IPlEHAZ+vHygfL8pcvl6z95s7z0/gflievXyytvvVO+Fvgb0G+g3gD11X/1OsYNKeBe8e3i2yocJP9igY3zFeenb/yoXPzg/fLxhfPlg/feFb388Uflbejff/ed8tMfv1Hu3L5dNq5dLye+uFJOX7xcHrp6tZy+fFnyMSR4DDZ2NI8e2dekuTsJ97r8/wC/O1y/eqXcvnmzbHKWcIvdA2UiVz77rKydOFGevbdZ5nhn/PLoWplgdrli3zlypHx+6mS5c+hQ+fCJx8uVUyfKgN/RMcstuO9c9CTUV37IfPf7RQMfdB77n3nhXHnuKy+JPvbU0+BfFP/CS79aXvzaq+Xk+kbZuHipDJH84Tt3yxx1jty6XT5+7NGyidtt9cbNcmt1Vc8Ze+methPBqel996/+bvHkLz1V1o6tlIOHl8vRtbXyz69/v/zwjf/S82S3DuwRwrpPVyHGRotCAFdTitTpeeAAMkTwTH6CRKibM7pmgkgeiXA1xm3cwHcbq9/v/+5vl5df/GUdU/j4bO9g9fv7b31n8cSzT2JJR1IYiZWVlfLO+Qvl0iefe2VCoFxSCVyluNwKoNJSy73CZneWlxL1UUaJULJSILa+NzpZ7j85SPySpf2IeiTpL1feYvx1asAAZf3kQ+Who8ew/YwUbodJffevv7N4EkmtYqa4+hzAyjOfTTFLS6qkFkTJqkklkp0mdGeC4KS86NRNXT9T+WCBEg0dfeJZEF8HoMPT16xlJnhv8572rgNLB+S7szPBba7RUGj5ssM+gPGU6VModeygKThGzsaADG70iPLZ4QKg/9jFpYgHATZAbIkgh4MzzfaMvhv8h7VZe3AE6qCKPYq4s7ujenUAEJn/ZKGZT3f8qRadqO2ioLOSAOXtSp6CdUYmzF7RZIpNtNoxGKhIm3zFp2wdKYuUUVpf64WfUjdNPwJZ5+O7guzP3j9fGux15aP3P8JSO4MD/91Erv4t1IGQJWZV1HzXv+X3WWKqcnal6pQEdZJM26DkB/mx6Gg0KVvbW2Vz625pLl66VX7y47fKJvYG/sWurdyp5IERuE9tOn7W7Sld+loVYO/9INcwZMR9FQGQI2ZaqkckryQFeBkfrZTen//pn907+8zTy69+49WyjCWdrzL8OMIVxlMfjTF21g6aZQ1KBn41hTwYhpyDwTVCC4V8/dx5QeHbDZ9R8qyx92W5tdmPgbio8XbtD/2eeuH8hVnv37/3vZMHjqx9YzDqPzccjTb6w+HSbHd6FK/9h5DEGJXHaJSfxAeINMbUjCgjJKd1CB/Obx/vj3zjdF9UEv1PTiggX/aDhB5zdG0KFltSM0GMKQwz2Cfo8DYpOjrDcOGVodmaT+cTDM8m2tmGetIfDjZRdxtL0u7OZHIdge8cPnx4qxkMLi0vL7/538wmLZE/yspSAAAAAElFTkSuQmCC';
}
